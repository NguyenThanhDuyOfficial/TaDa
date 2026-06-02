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

import { columns, Product } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "./products"

export default async function ProductsPage() {
  const data = await getData()



  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-background">
        <div>
          <h1> Products</h1>
          <p>Manage your products</p>
        </div>
        <div>
          {/* Add products  -Button */}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            size="lg">
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col m-4 p-4 rounded-lg bg-background">
        <div className="flex justify-between">
          {/* Search */}
          <div className="w-80">
            <Input type="search" placeholder="Search..." />
          </div>

          {/* Filter Bar */}
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
          <DataTable columns={columns} data={data} />
        </div>
      </div>


      <div>
        {/* Pagination - Pagination */}
      </div>
    </div>
  )
}
