"use client";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  Heart,
  LogOut,
  ShoppingBag,
  ChevronDown,
  Menu,
  Home,
  Info,
  Box,
  Phone,
  User,
  Grid,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../modules/dashboard/sidebar/mode-toggle";

const mealItems = [
  { _id: "67c228932e2b697ec2c81ea9", name: "Haddock" },
  { _id: "67c2289e2e2b697ec2c81eab", name: "drinks" },
  { _id: "67c228b22e2b697ec2c81ead", name: "Escalope de Veau" },
  { _id: "67c228cd2e2b697ec2c81eb1", name: "Roast Duck Breast" },
  { _id: "67c228ec2e2b697ec2c81eb7", name: "Breton Fish Stew" },
  { _id: "67cacd7aefb12935551789e5", name: "Chicken and Walnut Salad" },
  { _id: "67cac5f51d75d67dbc568e37", name: "singara-puri" },
  { _id: "67c96653e5a81bbf3245b61f", name: "fish and rice" },
];

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const filteredMeals = mealItems.filter((meal) =>
    meal.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelectMeal = (mealId: string) => {
    setSearchTerm("");
    setShowDropdown(false);
    router.push(`/mealcard/${mealId}`);
  };

  return (
    <header className="bg-black text-white w-full md:sticky top-0 z-10 p-2">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-2xl font-black text-white">
             <Image
                src="https://i.postimg.cc/0y77JqPJ/Pngtree-a-chef-holding-hamburger-and-20111871.png"
                alt="Food Logo"
                width={50}
                height={50}
                className="object-contain md:ml-3"
              />
          </Link>

          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => searchTerm && setShowDropdown(true)}
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showDropdown && searchTerm.trim() && (
              <div className="absolute top-full left-0 w-full bg-black border border-gray-700 rounded mt-1 shadow-lg z-30">
                {filteredMeals.length > 0 ? (
                  filteredMeals.map((meal) => (
                    <button
                      key={meal._id}
                      onClick={() => handleSelectMeal(meal._id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                    >
                      {meal.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400">No meals found</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full p-0 size-10 bg-black text-white hover:bg-white hover:text-black"
            >
              <Heart />
            </Button>
            <Link href="/cart">
              <Button
                variant="outline"
                className="rounded-full p-0 size-10 bg-black text-white hover:bg-white hover:text-black"
              >
                <ShoppingBag />
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="lg:hidden ml-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu />
            </Button>
          </div>
        </div>

        <nav className="hidden lg:flex mt-3 flex-wrap justify-center items-center gap-3 text-sm font-medium relative">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1"
            >
              <Home size={16} /> Home
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1"
            >
              <Info size={16} /> About
            </Button>
          </Link>
          <Link href="/mealcard">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1"
            >
              <Box size={16} /> All Products
            </Button>
          </Link>

          <div
            onMouseEnter={openMenu}
            onMouseLeave={closeMenuWithDelay}
            className="relative"
          >
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-white"
              onClick={() => setMegaMenuOpen((prev) => !prev)}
            >
              Category <ChevronDown size={16} />
            </Button>

            {megaMenuOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[400px] bg-black border border-gray-700 rounded shadow-lg p-6 grid grid-cols-1 gap-3 z-20 text-white"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenuWithDelay}
              >
                {mealItems.map((meal) => (
                  <Link
                    key={meal._id}
                    href={`/mealcard/${meal._id}`}
                    className="block px-3 py-2 rounded hover:bg-gray-700"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    {meal.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1"
            >
              <Phone size={16} /> Contact
            </Button>
          </Link>

          {user && (
            <>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="text-white flex items-center gap-1"
                >
                  <User size={16} /> Update Profile
                </Button>
              </Link>
              <Link href={`/${user?.jwtPayload?.role}/dashboard`}>
                <Button
                  variant="ghost"
                  className="text-white flex items-center gap-1"
                >
                  <Grid size={16} /> Dashboard
                </Button>
              </Link>
            </>
          )}

          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <Button
                onClick={handleLogOut}
                className="flex items-center gap-1 text-white bg-black"
              >
                <LogOut size={16} /> Log Out
              </Button>
            ) : (
              <Link href="/login">
                <Button className="border-white text-white bg-black flex items-center gap-1">
                  <LogIn size={16} /> Login
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>
        </nav>

        {mobileMenuOpen && (
          <nav className="lg:hidden mt-3 bg-black rounded p-4 border border-gray-700 flex flex-col gap-3 text-white text-sm font-medium z-30 relative">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={16} /> Home
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                className="w-full justify-start flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Info size={16} /> About
              </Button>
            </Link>
            <Link href="/mealcard">
              <Button
                variant="ghost"
                className="w-full justify-start flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Box size={16} /> All Products
              </Button>
            </Link>

            <div>
              <Button
                variant="ghost"
                className="w-full justify-between flex items-center gap-2"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
              >
                Category <ChevronDown size={16} />
              </Button>
              {megaMenuOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2 border-l border-gray-700 pl-4">
                  {mealItems.map((meal) => (
                    <Link
                      key={meal._id}
                      href={`/mealcard/${meal._id}`}
                      onClick={() => {
                        setMegaMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        {meal.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">
              <Button
                variant="ghost"
                className="w-full justify-start flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={16} /> Contact
              </Button>
            </Link>

            {user && (
              <>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} /> Update Profile
                  </Button>
                </Link>
                <Link href={`/${user?.jwtPayload?.role}/dashboard`}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Grid size={16} /> Dashboard
                  </Button>
                </Link>
              </>
            )}

            {user ? (
              <Button
                onClick={() => {
                  handleLogOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full justify-center"
              >
                <LogOut size={16} /> Log Out
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  className="border-white text-white bg-black flex items-center gap-2 w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={16} /> Login
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
