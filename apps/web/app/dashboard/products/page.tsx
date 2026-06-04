'use client'

import { useEffect, useState } from 'react'
import { AddProductsDiaglog } from './_components/AddProductsDialog'
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { getAllProducts } from "./_lib/products.api"
import { Product } from './_lib/products.type'



export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  // Search
  const [searchTerm, setSearchTerm] = useState('')


  function handleSearch() { }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const data = await getAllProducts()
      setProducts(data)
      setLoading(false)
    }
    fetchData()
  }, [])


  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-background">
        <div>
          <h1> Products</h1>
          <p>Manage your products</p>
        </div>
        <div>
          <AddProductsDiaglog />
        </div>
      </div>


      <div className="flex flex-col m-4 p-4 rounded-lg bg-background">
        <div className="flex justify-between">

          <div className="w-80">
            <Input type="search" placeholder="Search..." onChange={handleSearch} />
          </div>

          <div className="flex items-center gap-2">
            <Select >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="w-45">
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="createdAt-asc">Oldest first</SelectItem>
                <SelectItem value="createdAt-desc">Newest first</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
            <Button variant="ghost" size="icon"><RefreshCw /></Button>
          </div>

        </div>

        {/* Table */}
        <div className="mt-4">
          <DataTable columns={columns} data={products} />
        </div>
      </div>


    </div>
  )
}

