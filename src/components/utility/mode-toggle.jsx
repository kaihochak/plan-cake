import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  let theme = "dark";

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      theme = "light";
    } else {
      setTheme("dark");
      theme = "dark";
    }
  }

  return (
    <Button onClick={toggleTheme}
      variant="ghost" size="icon" className="flex items-center justify-center w-6 h-6 rounded-full lg:w-10 lg:h-10 bg-accent/10 focus-visible:ring-accent focus-visible:ring-offset-0">
      <Sun className="absolute h-[0.8rem] w-[0.8rem] lg:h-[1.2rem] lg:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[0.8rem] w-[0.8rem] lg:h-[1.2rem] lg:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
    </Button>
  
  )
}
