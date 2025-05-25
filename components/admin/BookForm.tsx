"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import { bookSchema } from "@/lib/validations"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import FileUpload from "../ui/FileUpload"
import ColorPicker from "./ColorPicker"
import { createBook, updateBook } from "@/lib/admin/actions/book"
import { toast } from "sonner"
import { useMemo } from "react"

interface Props extends Partial<Book> {
  type: "create" | "update";
  id?: string;
}

export default function BookForm({ type, ...book }: Props) {
  const defaultValues = useMemo(() => ({
    title: book.title || "",
    description: book.description || "",
    author: book.author || "",
    genre: book.genre || "",
    rating: book.rating || 1,
    totalCopies: book.totalCopies || 1,
    coverUrl: book.coverUrl || "",
    coverColor: book.coverColor || "",
    videoUrl: book.videoUrl || "",
    summary: book.summary || "",
  }), [book]);
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    let result;
  
    if (type === "update" && book?.id) {
      result = await updateBook({ bookId: book.id, params: values });
    } else {
      result = await createBook(values);
    }
  
    if (result.success) {
      toast.success(`Book ${type === "update" ? "updated" : "created"} successfully`);
      router.push("/admin/books/");
    } else {
      toast.error(`Book ${type === "update" ? "update" : "creation"} failed`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
              <FormControl>
                <Input required placeholder="Enter the book title" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>
              <FormControl>
                <Input required placeholder="Enter the author name" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Genre</FormLabel>
              <FormControl>
                <Input required placeholder="Enter the genre of the book" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Rating</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={5} placeholder="Book rating" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Total number of books</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10000} placeholder="Enter the total number of the books" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Upload a book cover" folder="books/covers" variant="light" onFileChange={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Color</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onPickerChange={field.onChange}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Description</FormLabel>
              <FormControl>
                <Textarea 
                placeholder="Book description" {...field} rows={10} className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book video</FormLabel>
              <FormControl>
                <FileUpload type="video" accept="video/*" placeholder="Upload a book trailer" folder="books/videos" variant="light" onFileChange={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Summary</FormLabel>
              <FormControl>
                <Textarea 
                placeholder="Book Summary" {...field} rows={5} className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="book-form_btn" disabled={form.formState.isSubmitting}>
          {type === "create" ? "Add a Book to Library" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
}
