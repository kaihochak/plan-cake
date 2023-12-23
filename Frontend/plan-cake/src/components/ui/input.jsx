import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-14 w-full border-b-2 border-input bg-primary text-primary-foreground p-2 text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type, isSearchBar, ...props }, ref) => {
//   // Define the base class names
//   const baseClassNames = "flex h-14 w-full border-b-2 border-input bg-primary text-primary-foreground p-2 text-m-m ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

//   // Define additional class names for the search bar
//   const searchBarClassNames = "border-2 mb-5";

//   // Use the cn function to concatenate class names conditionally
//   const finalClassNames = cn(
//     baseClassNames,
//     isSearchBar ? searchBarClassNames : '',
//     className
//   );

//   return (
//     <input
//       type={type}
//       className={finalClassNames}
//       ref={ref}
//       {...props}
//     />
//   );
// })

// Input.displayName = "Input"

// export { Input }
