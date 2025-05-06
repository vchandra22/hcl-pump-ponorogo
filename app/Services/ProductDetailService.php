<?php

namespace App\Services;

use App\Repositories\ProductDetail\ProductDetailRepository;
use Illuminate\Support\Facades\DB;

class ProductDetailService
{
    private $product_detail_repository;

    function __construct(ProductDetailRepository $product_detail_repository)
    {
        $this->product_detail_repository = $product_detail_repository;
    }

    public function getAllProductDetails()
    {
        return $this->product_detail_repository->all();
    }

    public function getProductDetailByProductId(string $product_id)
    {
        return $this->product_detail_repository->findByProductId($product_id);
    }

    public function createProductDetail(
        string $product_id,
        string $description = '',
        string $specification = '',
        string $additional_info = '',
    )
    {
        DB::beginTransaction();
        try {
            $data = $this->product_detail_repository->create([
                'product_id' => $product_id,
                'description' => $description,
                'specification' => $specification,
                'additional_info' => $additional_info
            ]);
            DB::commit();
            return $data;
        } catch (\Exception $err) {
            DB::rollBack();
            throw $err;
        }
    }

    public function updateProductDetail(
        string $id,
        string $product_id,
        string $description,
        string $specification,
        string $additional_info
    )
    {
        DB::beginTransaction();
        try {
            $data = $this->product_detail_repository->update($id, [
                'product_id' => $product_id,
                'description' => $description,
                'specification' => $specification,
                'additional_info' => $additional_info
            ]);
            DB::commit();
            return $data;
        } catch (\Exception $err) {
            DB::rollBack();
            throw $err;
        }
    }

    public function deleteProductDetail(string $id)
    {
        DB::beginTransaction();
        try {
            $this->product_detail_repository->delete($id);
            DB::commit();
            return true;
        } catch (\Exception $err) {
            DB::rollBack();
            throw $err;
        }
    }
}
