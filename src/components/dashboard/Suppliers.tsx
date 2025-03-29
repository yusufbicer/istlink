
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlusIcon, MoreHorizontalIcon, SearchIcon, PackageIcon, StarIcon, ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for suppliers
const initialSuppliers = [
  { 
    id: "1", 
    name: "Textile Masters Co.", 
    category: "Clothing & Textiles", 
    location: "Istanbul", 
    contact: "info@textilemasters.com", 
    phone: "+90 212 456 7890",
    status: "active",
    rating: 4.8,
    orders: 24
  },
  { 
    id: "2", 
    name: "Anatolian Ceramics", 
    category: "Home Goods", 
    location: "Izmir", 
    contact: "sales@anatolianceramics.com", 
    phone: "+90 232 345 6789",
    status: "active",
    rating: 4.5,
    orders: 18
  },
  { 
    id: "3", 
    name: "Turkish Delights Ltd.", 
    category: "Food Products", 
    location: "Ankara", 
    contact: "orders@turkishdelights.com", 
    phone: "+90 312 234 5678",
    status: "active",
    rating: 4.2,
    orders: 32
  },
  { 
    id: "4", 
    name: "Modern Furniture Co.", 
    category: "Furniture", 
    location: "Istanbul", 
    contact: "contact@modernfurniture.com", 
    phone: "+90 212 345 6789",
    status: "inactive",
    rating: 3.9,
    orders: 7
  },
  { 
    id: "5", 
    name: "Bosphorus Tech", 
    category: "Electronics", 
    location: "Istanbul", 
    contact: "sales@bosphorustech.com", 
    phone: "+90 212 567 8901",
    status: "active",
    rating: 4.6,
    orders: 41
  },
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(initialSuppliers);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    category: "",
    location: "",
    contact: "",
    phone: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter suppliers based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers);
    }
  }, [searchTerm, suppliers]);

  // Handle adding a new supplier
  const handleAddSupplier = () => {
    const newId = (suppliers.length + 1).toString();
    const supplierToAdd = {
      ...newSupplier,
      id: newId,
      status: "active",
      rating: 0,
      orders: 0
    };
    
    setSuppliers([...suppliers, supplierToAdd]);
    setNewSupplier({
      name: "",
      category: "",
      location: "",
      contact: "",
      phone: ""
    });
    setIsDialogOpen(false);
  };

  // Format the rating with stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="mr-2">{rating.toFixed(1)}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill={i < Math.floor(rating) ? 'currentColor' : 'none'} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships and information.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-10">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Enter the details of your new supplier. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Supplier name"
                  className="col-span-3"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  placeholder="Product category"
                  className="col-span-3"
                  value={newSupplier.category}
                  onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="col-span-3"
                  value={newSupplier.location}
                  onChange={(e) => setNewSupplier({...newSupplier, location: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Email
                </Label>
                <Input
                  id="contact"
                  type="email"
                  placeholder="contact@example.com"
                  className="col-span-3"
                  value={newSupplier.contact}
                  onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="+90 123 456 7890"
                  className="col-span-3"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSupplier}>Save Supplier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      <Card 
        className={`transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier, index) => (
                <TableRow 
                  key={supplier.id}
                  className={`transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <PackageIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      {supplier.name}
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{supplier.location}</TableCell>
                  <TableCell>
                    <div className="grid gap-0.5">
                      <span className="text-sm">{supplier.contact}</span>
                      <span className="text-xs text-muted-foreground">{supplier.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{renderRating(supplier.rating)}</TableCell>
                  <TableCell>{supplier.orders}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredSuppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No suppliers found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className={`transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <CardHeader>
            <CardTitle>Top Suppliers</CardTitle>
            <CardDescription>Based on order volume and rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers
                .sort((a, b) => b.orders - a.orders)
                .slice(0, 3)
                .map((supplier, i) => (
                  <div key={supplier.id} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-600">
                      <span className="font-semibold text-sm">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.orders} orders · {supplier.rating.toFixed(1)} rating
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Suppliers by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(new Set(suppliers.map(s => s.category))).map(category => {
                const count = suppliers.filter(s => s.category === category).length;
                const percentage = (count / suppliers.length) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest supplier interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="text-sm font-medium">New supplier added</div>
                <div className="text-xs text-muted-foreground">Today, 10:30 AM</div>
              </div>
              <div className="border-l-2 border-green-500 pl-4 py-1">
                <div className="text-sm font-medium">Order placed with Textile Masters</div>
                <div className="text-xs text-muted-foreground">Yesterday, 2:15 PM</div>
              </div>
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <div className="text-sm font-medium">Supplier rating updated</div>
                <div className="text-xs text-muted-foreground">Jul 24, 11:45 AM</div>
              </div>
              <div className="border-l-2 border-purple-500 pl-4 py-1">
                <div className="text-sm font-medium">Contract renewed with Bosphorus Tech</div>
                <div className="text-xs text-muted-foreground">Jul 22, 4:30 PM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Suppliers;
