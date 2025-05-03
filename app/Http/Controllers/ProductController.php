<?php

namespace App\Http\Controllers;

use App\Http\Requests\products\StoreProductRequest;
use App\Services\MetaService;
use App\Services\ProductDetailService;
use App\Services\ProductImageService;
use App\Services\ProductService;
use App\Services\UploadImageService;
use Illuminate\Http\Request;
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
        return Inertia::render('product/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request, UploadImageService $upload_image_service)
    {
        try {
            $data = $request->validated();

            $meta = $this->meta_service->createMeta(
                $data['meta_title'],
                $data['meta_description'],
                'oke, oke',
                'oke',
                'oke'
            );

            $product = $this->product_service->createProduct(
                $data['title'],
                $data['short_description'],
                $data['price'],
                $data['sale_price'],
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
            dd($product);
            return $product;
        } catch(\Exception $err) {
            return back()->with('failed', 'Product not found. Error: '.$err);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // delete meta
            $product = $this->product_service->getProductById($id);
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
