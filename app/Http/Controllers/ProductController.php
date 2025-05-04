<?php

namespace App\Http\Controllers;

use App\Http\Requests\products\StoreProductRequest;
use App\Http\Requests\products\UpdateProductRequest;
use App\Services\MetaService;
use App\Services\ProductDetailService;
use App\Services\ProductImageService;
use App\Services\ProductService;
use App\Services\UploadImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $product_service;
    private $product_detail_service;
    private $product_image_service;
    private $meta_service;

    function __construct(ProductService $product_service, ProductDetailService $product_detail_service, ProductImageService $product_image_service, MetaService $meta_service)
    {
        $this->product_service = $product_service;
        $this->product_detail_service = $product_detail_service;
        $this->product_image_service = $product_image_service;
        $this->meta_service = $meta_service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->product_service->getAllProducts();
        return Inertia::render('product/index', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('product/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request, UploadImageService $upload_image_service)
    {
        $data = $request->validated();
        $uploaded_og_image = null;        
        try {
            if($data['og_image']) {
                $uploaded_og_image = $upload_image_service->single($data['og_image']);
            }
            $meta = $this->meta_service->createMeta(
                $data['meta_title'],
                $data['meta_description'],
                $data['meta_keywords'] ?? '',
                $uploaded_og_image['path'] ?? '',
                $data['image_alt'] ?? ''
            );

            $product = $this->product_service->createProduct(
                $data['title'],
                $data['short_description'],
                $data['price'],
                $data['sale_price'],
                $data['is_featured'],
                $data['is_active'],
                $meta->id
            );

            $this->product_detail_service->createProductDetail(
                $product->id,
                $data['description'] ?? '-',
                $data['specification'] ?? '-',
                $data['additional_info'] ?? '-'
            );

            $images = $upload_image_service->multiple($data['product_images']);

            foreach ($images as $image) {
                $this->product_image_service->createProductImages(
                    $product->id,
                    $image['name'],
                    $image['path'],
                    'Gambar Produk'
                );
            }
            
            return redirect('/products')->with('success', "Create product successfully.");
        } catch (\Exception $err) {
            dd($err);
            return back()->with('failed', "Create product failed. Error: " . $err);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $product = $this->product_service->getProductById($id);
            return Inertia::render('product/edit', ['product' => $product]);
        } catch(\Exception $err) {
            return back()->with('failed', 'Product not found. Error: '.$err);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id, UploadImageService $upload_image_service)
    {
        $data = $request->validated();
        $new_og_image = null;

        $product = $this->product_service->getProductById($id);

        try {
            if($data['og_image']) {
                $array = explode('/', $data['old_og_image']);
                $path = implode('/', array_splice($array, 2)); 
                Storage::disk('public')->delete($path);
                
                // upload new og image
                $new_og_image = $upload_image_service->single($data['og_image']);
            }

            if ($data['product_images']) {
                $images = $upload_image_service->multiple($data['product_images']);

                foreach ($images as $image) {
                    $this->product_image_service->createProductImages(
                        $product->id,
                        $image['name'],
                        $image['path'],
                        'Gambar Produk'
                    );
                }
            }

            $this->product_service->updateProduct(
                $id,
                $data['title'],
                $data['short_description'],
                $data['price'],
                $data['sale_price'],
                $data['is_featured'],
                $data['is_active'],
                $product->meta_id
            );
            
            $this->meta_service->updateMeta($product->meta_id, [
                'meta_title' => $data['meta_title'],
                'meta_description' => $data['meta_description'],
                'meta_keywords' => $data['meta_keywords'],
                'og_image' => $new_og_image['path'] ?? $data['old_og_image'],
                'image_alt' => $data['image_alt']
            ]);

            $product_detail = $this->product_detail_service->getProductDetailByProductId($id);
            $this->product_detail_service->updateProductDetail(
                $product_detail->id,
                $id,
                $data['description'],
                $data['specification'],
                $data['additional_info']
            );
            
            return redirect('/products')->with('success', 'Update product successfully.');
        } catch (\Exception $err) {
            dd($err);
            return back()->with('failed', 'Update product failed. Error: ' . $err);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // delete meta
            $product = $this->product_service->getProductById($id);
            $meta = $this->meta_service->getMetaById($product->meta_id);
            $array = explode('/', $meta->og_image);
            $path = implode('/', array_splice($array, 2));
            Storage::disk('public')->delete($path);
            $this->meta_service->deleteMeta($product->meta_id);

            // delete product detail
            $product_detail = $this->product_detail_service->getProductDetailByProductId($id);
            $this->product_detail_service->deleteProductDetail($product_detail->id);
            
            // delete product images
            $this->product_image_service->deleteAllProductImages($id);
            
            // delete product
            $this->product_service->deleteProduct($id);

            return back()->with('success', "Delete product successfully.");
        } catch(\Exception $err) {
            return back()->with('failed', 'Delete product failed. Error: '.$err);
        }
    }
}
