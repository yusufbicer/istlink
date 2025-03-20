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
import { Badge } from "@/components/ui/badge";
import { 
  StickyNoteIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  SearchIcon, 
  ClipboardListIcon,
  ReplyIcon,
  UserIcon,
  UserCircleIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const initialNotes = [
  {
    id: "NOTE-001",
    orderId: "ORD-1234",
    title: "Shipping Instructions",
    content: "Please pack items individually with bubble wrap to prevent damage.",
    createdBy: "John Smith",
    createdByRole: "buyer",
    createdAt: "2023-08-15T10:30:00Z",
    replies: [
      {
        id: "REP-001",
        content: "We will make sure to use bubble wrap for all items as requested.",
        createdBy: "Supplier Demo",
        createdByRole: "supplier",
        createdAt: "2023-08-15T14:20:00Z"
      }
    ]
  },
  {
    id: "NOTE-002",
    orderId: "ORD-1235",
    title: "Delivery Preference",
    content: "Customer prefers delivery in the afternoon, after 2 PM.",
    createdBy: "John Smith",
    createdByRole: "buyer",
    createdAt: "2023-08-16T14:15:00Z",
    replies: []
  },
  {
    id: "NOTE-003",
    orderId: "ORD-1236",
    title: "Custom Packaging",
    content: "Use gift wrapping for all items, as this is a gift order.",
    createdBy: "Emma Johnson",
    createdByRole: "buyer",
    createdAt: "2023-08-17T09:45:00Z",
    replies: [
      {
        id: "REP-002",
        content: "We will use our premium gift wrapping service for this order. Is there any specific color preference?",
        createdBy: "Supplier Demo",
        createdByRole: "supplier",
        createdAt: "2023-08-17T11:30:00Z"
      },
      {
        id: "REP-003",
        content: "Yes, please use blue and silver wrapping if available.",
        createdBy: "Emma Johnson",
        createdByRole: "buyer",
        createdAt: "2023-08-17T13:15:00Z"
      }
    ]
  },
  {
    id: "NOTE-004",
    orderId: "ORD-1237",
    title: "Fragile Items",
    content: "Several items are marked as fragile. Handle with extra care.",
    createdBy: "Robert Wilson",
    createdByRole: "buyer",
    createdAt: "2023-08-18T11:20:00Z",
    replies: []
  }
];

const Notes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState<any>(null);
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [replyContent, setReplyContent] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    orderId: "",
    content: ""
  });
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (user?.role === "admin") {
      return matchesSearch;
    }
    
    if (user?.role === "supplier") {
      return matchesSearch && (note.createdByRole === "supplier" || true);
    }
    
    if (user?.role === "buyer") {
      return matchesSearch && (note.createdBy === user.name || note.createdByRole === "buyer");
    }
    
    return false;
  });

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

  const handleCreateNote = () => {
    const newNoteObj = {
      id: `NOTE-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...newNote,
      createdBy: user?.name || "Unknown User",
      createdByRole: user?.role || "buyer",
      createdAt: new Date().toISOString(),
      replies: []
    };
    
    setNotes([...notes, newNoteObj]);
    setNewNote({ title: "", orderId: "", content: "" });
    
    toast({
      title: "Note Created",
      description: "Your note has been successfully added to the order."
    });
  };

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

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    
    toast({
      title: "Note Deleted",
      description: "The note has been successfully deleted."
    });
  };

  const handleAddReply = () => {
    if (!replyingTo || !replyContent.trim()) return;
    
    const newReply = {
      id: `REP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      content: replyContent,
      createdBy: user?.name || "Unknown User",
      createdByRole: user?.role || "buyer",
      createdAt: new Date().toISOString()
    };
    
    const updatedNotes = notes.map(note => 
      note.id === replyingTo.id 
        ? { ...note, replies: [...note.replies, newReply] }
        : note
    );
    
    setNotes(updatedNotes);
    setReplyingTo(null);
    setReplyContent("");
    
    toast({
      title: "Reply Added",
      description: "Your reply has been successfully added to the note."
    });
  };

  const handleDeleteReply = (noteId: string, replyId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, replies: note.replies.filter(reply => reply.id !== replyId) }
        : note
    );
    
    setNotes(updatedNotes);
    
    toast({
      title: "Reply Deleted",
      description: "The reply has been successfully deleted."
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>;
      case 'supplier':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Supplier</Badge>;
      case 'buyer':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Buyer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const canModify = (createdBy: string, createdByRole: string) => {
    if (user?.role === "admin") return true;
    
    return createdBy === user?.name || createdByRole === user?.role;
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
              {filteredNotes.reduce((total, note) => total + note.replies.length, 0)}
            </CardTitle>
            <CardDescription>Total Replies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {filteredNotes.reduce((total, note) => total + note.replies.length, 0)} replies to notes
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
                <TableHead>Replies</TableHead>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{note.createdBy}</span>
                        {getRoleBadge(note.createdByRole)}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(note.createdAt)}</TableCell>
                    <TableCell>
                      <Badge>{note.replies.length}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{note.title}</DialogTitle>
                            <DialogDescription>
                              {note.orderId} • Added by {note.createdBy} on {formatDate(note.createdAt)}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <UserCircleIcon className="h-5 w-5 text-blue-600" />
                                  <span className="font-medium">{note.createdBy}</span>
                                  {getRoleBadge(note.createdByRole)}
                                </div>
                                <span className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</span>
                              </div>
                              <p className="text-sm leading-6">{note.content}</p>
                            </div>
                            
                            {note.replies.length > 0 && (
                              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                                <h4 className="text-sm font-medium">Replies</h4>
                                
                                {note.replies.map(reply => (
                                  <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <UserIcon className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">{reply.createdBy}</span>
                                        {getRoleBadge(reply.createdByRole)}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</span>
                                        {canModify(reply.createdBy, reply.createdByRole) && (
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6"
                                            onClick={() => handleDeleteReply(note.id, reply.id)}
                                          >
                                            <TrashIcon className="h-3 w-3 text-red-500" />
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm">{reply.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-4 pt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Add Reply</h4>
                              <div className="space-y-3">
                                <Textarea 
                                  placeholder="Type your reply here..."
                                  className="min-h-[80px]"
                                  value={replyingTo?.id === note.id ? replyContent : ""}
                                  onChange={(e) => {
                                    setReplyingTo(note);
                                    setReplyContent(e.target.value);
                                  }}
                                />
                                <Button 
                                  size="sm"
                                  onClick={handleAddReply}
                                  disabled={!replyContent.trim()}
                                >
                                  <ReplyIcon className="h-4 w-4 mr-2" />
                                  Add Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {canModify(note.createdBy, note.createdByRole) && (
                        <>
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
                                    defaultValue={note.orderId}
                                    onChange={(e) => setEditingNote({
                                      ...note,
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
                                    defaultValue={note.title}
                                    onChange={(e) => setEditingNote({
                                      ...note,
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
                                    defaultValue={note.content}
                                    onChange={(e) => setEditingNote({
                                      ...note,
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
                        </>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ReplyIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reply to Note</DialogTitle>
                            <DialogDescription>
                              Add a reply to "{note.title}"
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <div className="bg-gray-50 p-3 rounded-md mb-4">
                              <p className="text-sm italic">{note.content}</p>
                              <div className="text-xs text-muted-foreground mt-2">
                                By {note.createdBy} on {formatDate(note.createdAt)}
                              </div>
                            </div>
                            
                            <Textarea 
                              placeholder="Type your reply here..."
                              className="min-h-[100px]"
                              value={replyingTo?.id === note.id ? replyContent : ""}
                              onChange={(e) => {
                                setReplyingTo(note);
                                setReplyContent(e.target.value);
                              }}
                            />
                          </div>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button 
                              onClick={handleAddReply}
                              disabled={!replyContent.trim()}
                            >
                              Post Reply
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
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
