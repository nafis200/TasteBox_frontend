"use client";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag, ChevronDown } from "lucide-react";
import Link from "next/link";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";

const mealItems = [
  { _id: "67cacd7aefb12935551789e5", name: "Chicken and Walnut Salad" },
  { _id: "67cac5f51d75d67dbc568e37", name: "singara-puri" },
  { _id: "67c96653e5a81bbf3245b61f", name: "fish and rice" },
  { _id: "67c965f9e5a81bbf3245b61d", name: "fish and rice" },
  { _id: "67c9656de5a81bbf3245b616", name: "fish and rice" },
];

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setMegaMenuOpen(true);
  };

  const closeMenuWithDelay = () => {
    closeTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10 p-2 bg-gray-300">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

          <Link href="/" className="text-2xl font-black text-blue-700">
            Meal Box
          </Link>

          <div className="flex-1 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full p-0 size-10">
              <Heart />
            </Button>
            <Link href="/cart">
              <Button variant="outline" className="rounded-full p-0 size-10">
                <ShoppingBag />
              </Button>
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex flex-wrap justify-center lg:justify-end gap-3 text-sm font-medium relative">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>

          <div
            onMouseEnter={openMenu}
            onMouseLeave={closeMenuWithDelay}
            className="relative"
          >
            <Button
              variant="ghost"
              className="flex items-center gap-1"
              onClick={() => setMegaMenuOpen((prev) => !prev)}
            >
              Products <ChevronDown size={16} />
            </Button>

            {megaMenuOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[400px] bg-white border rounded shadow-lg p-6 grid grid-cols-1 gap-3 z-20 text-gray-700"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenuWithDelay}
              >
                {mealItems.map((meal) => (
                  <Link
                    key={meal._id}
                    href={`/mealcard/${meal._id}`}
                    className="block px-3 py-2 rounded hover:bg-blue-100"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    {meal.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost">Update Profile</Button>
              </Link>
              <Link href="/mealcard">
                <Button variant="ghost">Buy Shop</Button>
              </Link>
              <Link href={`/${user?.jwtPayload?.role}/dashboard`}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleLogOut}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                Log Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
