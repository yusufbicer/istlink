
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  StickyNoteIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  SearchIcon, 
  ClipboardListIcon 
} from "lucide-react";
import { useAuth } from "@/lib/auth";

// Mock data for notes
const initialNotes = [
  {
    id: "NOTE-001",
    orderId: "ORD-1234",
    title: "Shipping Instructions",
    content: "Please pack items individually with bubble wrap to prevent damage.",
    createdBy: "John Smith",
    createdAt: "2023-08-15T10:30:00Z"
  },
  {
    id: "NOTE-002",
    orderId: "ORD-1235",
    title: "Delivery Preference",
    content: "Customer prefers delivery in the afternoon, after 2 PM.",
    createdBy: "John Smith",
    createdAt: "2023-08-16T14:15:00Z"
  },
  {
    id: "NOTE-003",
    orderId: "ORD-1236",
    title: "Custom Packaging",
    content: "Use gift wrapping for all items, as this is a gift order.",
    createdBy: "Emma Johnson",
    createdAt: "2023-08-17T09:45:00Z"
  },
  {
    id: "NOTE-004",
    orderId: "ORD-1237",
    title: "Fragile Items",
    content: "Several items are marked as fragile. Handle with extra care.",
    createdBy: "Robert Wilson",
    createdAt: "2023-08-18T11:20:00Z"
  }
];

const Notes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState<any>(null);
  const [newNote, setNewNote] = useState({
    title: "",
    orderId: "",
    content: ""
  });
  
  // Filter notes based on search and user role
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Admin can see all notes, others see only their own
    if (user?.role !== "admin") {
      return matchesSearch && note.createdBy === user?.name;
    }
    
    return matchesSearch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Create new note
  const handleCreateNote = () => {
    const newNoteObj = {
      id: `NOTE-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...newNote,
      createdBy: user?.name || "Unknown User",
      createdAt: new Date().toISOString()
    };
    
    setNotes([...notes, newNoteObj]);
    setNewNote({ title: "", orderId: "", content: "" });
    
    toast({
      title: "Note Created",
      description: "Your note has been successfully added to the order."
    });
  };

  // Update note
  const handleUpdateNote = () => {
    if (!editingNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === editingNote.id ? { ...note, ...editingNote } : note
    );
    
    setNotes(updatedNotes);
    setEditingNote(null);
    
    toast({
      title: "Note Updated",
      description: "Your note has been successfully updated."
    });
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    
    toast({
      title: "Note Deleted",
      description: "The note has been successfully deleted."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order Notes</h1>
          <p className="text-muted-foreground">
            Manage notes and instructions for your orders
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notes..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogDescription>
                  Create a new note for an order
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="order-id" className="text-right">
                    Order ID
                  </Label>
                  <Input 
                    id="order-id" 
                    placeholder="e.g., ORD-1234"
                    className="col-span-3"
                    value={newNote.orderId}
                    onChange={(e) => setNewNote({...newNote, orderId: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input 
                    id="title" 
                    placeholder="Note title"
                    className="col-span-3"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Content
                  </Label>
                  <Textarea 
                    id="content" 
                    placeholder="Enter your note content here..."
                    className="col-span-3 min-h-[100px]"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateNote}
                  disabled={!newNote.title || !newNote.orderId || !newNote.content}
                >
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{filteredNotes.length}</CardTitle>
            <CardDescription>Total Notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <StickyNoteIcon className="mr-2 h-4 w-4" />
              <span>Notes</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {new Set(filteredNotes.map(note => note.orderId)).size}
            </CardTitle>
            <CardDescription>Orders with Notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Notes are attached to {new Set(filteredNotes.map(note => note.orderId)).size} different orders
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {filteredNotes.filter(note => new Date(note.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </CardTitle>
            <CardDescription>Notes Added This Week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {filteredNotes.filter(note => new Date(note.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new notes in the last 7 days
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Notes</CardTitle>
          <CardDescription>
            View and manage notes attached to orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.length > 0 ? (
                filteredNotes.map(note => (
                  <TableRow key={note.id}>
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ClipboardListIcon className="h-4 w-4 text-blue-600" />
                        <span>{note.orderId}</span>
                      </div>
                    </TableCell>
                    <TableCell>{note.title}</TableCell>
                    <TableCell>{note.createdBy}</TableCell>
                    <TableCell>{formatDate(note.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{note.title}</DialogTitle>
                            <DialogDescription>
                              {note.orderId} • Added by {note.createdBy} on {formatDate(note.createdAt)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm leading-6">{note.content}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Note</DialogTitle>
                            <DialogDescription>
                              Make changes to your note
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-order-id" className="text-right">
                                Order ID
                              </Label>
                              <Input 
                                id="edit-order-id" 
                                className="col-span-3"
                                value={editingNote?.orderId || note.orderId}
                                onChange={(e) => setEditingNote({
                                  ...editingNote || note,
                                  orderId: e.target.value
                                })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-title" className="text-right">
                                Title
                              </Label>
                              <Input 
                                id="edit-title" 
                                className="col-span-3"
                                value={editingNote?.title || note.title}
                                onChange={(e) => setEditingNote({
                                  ...editingNote || note,
                                  title: e.target.value
                                })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                              <Label htmlFor="edit-content" className="text-right pt-2">
                                Content
                              </Label>
                              <Textarea 
                                id="edit-content" 
                                className="col-span-3 min-h-[100px]"
                                value={editingNote?.content || note.content}
                                onChange={(e) => setEditingNote({
                                  ...editingNote || note,
                                  content: e.target.value
                                })}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" onClick={() => setEditingNote(null)}>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button onClick={handleUpdateNote}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No notes found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notes;
