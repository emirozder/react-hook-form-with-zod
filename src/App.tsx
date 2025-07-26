import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  topic: z.enum(["frontend", "backend"]),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  terms: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions",
  }),
});

const App = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      topic: "frontend",
      message: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Form submitted successfully!");
  }

  return (
    <>
      <Toaster position="top-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-10 rounded-2xl w-3xl"
        >
          <h1 className="text-3xl font-bold mb-8">Ask Your Question</h1>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  {/* 
                Using col-[1/-1] to span the full width of the grid. (instead of col-span-2. if we would use grid-cols-3 or grid-cols-4 etc. we would need to use col-span-3 or col-span-4. If we change the grid in the main component, we would need to update this again and again. Using col-[1/-1] is a better way to do it.)

                col-[1/-1] kullanmak grid genişliğini tam olarak kaplamak için kullanılır. (col-span-2 yerine. ana komponentte grid-cols-3 veya grid-cols-4 gibi bir şey kullanırsak col-span-3 veya col-span-4 kullanmamız gerekir. Ana komponentte değişiklik yapıldığında burayı tekrar tekrar güncellemek yerine col-[1/-1] kullanmak daha iyi bir yöntemdir.)
              */}
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="topic"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel className="mb-3">
                    What would you like to talk about?
                  </FormLabel>
                  <FormControl className="flex gap-x-8">
                    <RadioGroup
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem className="flex-row items-center gap-3 basis-1/2">
                        <FormControl>
                          <RadioGroupItem value="frontend" id="frontend" />
                        </FormControl>
                        <FormLabel htmlFor="frontend">Frontend</FormLabel>
                      </FormItem>
                      <FormItem className="flex-row items-center gap-3 basis-1/2">
                        <FormControl>
                          <RadioGroupItem value="backend" id="backend" />
                        </FormControl>
                        <FormLabel htmlFor="backend">Backend</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      {...field}
                      className="resize-none min-h-32"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="terms"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1] ">
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="terms">
                      I accept the terms and conditions
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full text-lg">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default App;
