// components/Navbar.tsx
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button is here
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input is here
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile drawer

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* You can replace this with an SVG logo or an Image component */}
            <span className="font-bold text-2xl text-green-500">livee</span>
            <span className="font-bold text-sm text-primary hidden sm:inline-block">
              ™
            </span>
          </Link>
          {/* Desktop navigation items can go here if needed */}
        </div>

        {/* Search Bar - Centered for larger screens */}
        <div className="flex-1 flex justify-center px-4 lg:px-8">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              />
            </div>
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-black"
            asChild
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
              <div className="flex flex-col space-y-4 p-6">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <span className="font-bold text-2xl text-green-500">
                    KICK
                  </span>
                  <span className="font-bold text-sm text-primary">™</span>
                </Link>

                {/* Mobile Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm"
                  />
                </div>

                <nav className="flex flex-col space-y-2">
                  {/* Add mobile navigation links here if any */}
                  {/* Example:
                  <Link href="/browse" className="text-lg font-medium text-foreground hover:text-muted-foreground">
                    Browse
                  </Link>
                  */}
                </nav>
                <div className="mt-auto flex flex-col space-y-2 pt-6">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// Notes on how to use and setup:
// 1. Save this file as `components/Navbar.tsx` in your Next.js project.
// 2. Ensure you have Shadcn/UI installed and configured.
//    If not, follow the instructions at https://ui.shadcn.com/docs/installation/next
// 3. Install lucide-react: `npm install lucide-react` or `yarn add lucide-react`.
// 4. You'll need to have `components/ui/button.tsx`, `components/ui/input.tsx`,
//    and `components/ui/sheet.tsx` (and its dependencies like dialog, separator)
//    from Shadcn/UI in your project. You can add them using the Shadcn CLI:
//    `npx shadcn-ui@latest add button input sheet`
// 5. Import and use this Navbar component in your layout file (e.g., `app/layout.tsx` or `pages/_app.tsx`).
//    Example for `app/layout.tsx` (App Router):
//    ```tsx
//    // app/layout.tsx
//    import Navbar from '@/components/Navbar';
//    import './globals.css'; // Your global styles
//    import { Inter } from 'next/font/google';
//
//    const inter = Inter({ subsets: ['latin'] });
//
//    export const metadata = {
//      title: 'My Kick App',
//      description: 'Generated by create next app',
//    };
//
//    export default function RootLayout({
//      children,
//    }: {
//      children: React.ReactNode;
//    }) {
//      return (
//        <html lang="en" suppressHydrationWarning>
//          <body className={inter.className}>
//            <Navbar />
//            <main>{children}</main>
//            {/* Add Footer or other layout components */}
//          </body>
//        </html>
//      );
//    }
//    ```
// 6. Customize the logo, links, and styles as needed.
//    The "KICK" logo is text-based; you might want to replace it with an SVG or an Image component.
//    The green color for the logo and sign-up button is `text-green-500` and `bg-green-500`.
//    Adjust this to your desired brand color.
// 7. The search bar is a simple input. You'll need to implement the actual search functionality.
// 8. The mobile menu uses Shadcn/UI's `Sheet` component for a slide-out drawer.
