"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "./button";

const components: { 
  id: string; 
  title: string; 
  href: string; 
  description: string; 
  matrix: string; 
}[] = [
  {
    id: "hadamard",
    title: "Hadamard Gate",
    href: "docs/#hadamard",
    description:
      "Creates superposition by transforming the qubit's state into an equal superposition of |0⟩ and |1⟩ states.",
    matrix: "(1/√2) * [[1, 1],\n[1, -1]]",
  },
  {
    id: "cnot-gate",
    title: "CNOT Gate",
    href: "docs/#cnot",
    description:
      "A two-qubit gate that flips the target qubit if the control qubit is in the |1⟩ state.",
    matrix: "[[1, 0, 0, 0],\n [0, 1, 0, 0],\n [0, 0, 0, 1],\n [0, 0, 1, 0]]",
  },
  {
    id: "pauli-x-gate",
    title: "Pauli-X Gate",
    href: "docs/#pauli-x",
    description:
      "Also known as the quantum NOT gate, it flips the state of a qubit from |0⟩ to |1⟩ or vice versa.",
    matrix: "[[0, 1],\n [1, 0]]",
  },
  {
    id: "pauli-z-gate",
    title: "Pauli-Z Gate",
    href: "docs/#pauli-z",
    description:
      "Applies a phase flip to a qubit, leaving |0⟩ unchanged but flipping the phase of |1⟩.",
    matrix: "[[1, 0],\n [0, -1]]",
  },
  {
    id: "t-gate",
    title: "T Gate",
    href: "docs/#t",
    description:
      "A single-qubit gate that applies a π/4 phase shift, used in quantum algorithms requiring precise rotations.",
    matrix: "[[1, 0],\n [0, e^(iπ/4)]]",
  },
  {
    id: "swap-gate",
    title: "SWAP Gate",
    href: "docs/#swap",
    description:
      "Exchanges the states of two qubits, effectively swapping their quantum information.",
    matrix: "[[1, 0, 0, 0],\n [0, 0, 1, 0],\n [0, 1, 0, 0],\n [0, 0, 0, 1]]",
  },
  {
    id: "s-gate",
    title: "S Gate",
    href: "docs/#s",
    description:
      "A phase gate that applies a π/2 phase shift to a qubit.",
    matrix: "[[1, 0],\n [0, i]]",
  },
  {
    id: "x-gate",
    title: "X Gate",
    href: "docs/#x",
    description:
      "The Pauli-X gate, equivalent to the classical NOT gate, flips the qubit's state from |0⟩ to |1⟩ and vice versa.",
    matrix: "[[0, 1],\n [1, 0]]",
  },
  {
    id: "y-gate",
    title: "Y Gate",
    href: "docs/#y",
    description:
      "The Pauli-Y gate is a combination of the X and Z gates and introduces a complex phase.",
    matrix: "[[0, -i],\n [i, 0]]",
  },
  {
    id: "u3-gate",
    title: "U3 Gate",
    href: "docs/#u3",
    description:
      "A single-qubit gate that applies a general rotation of the form U3(θ, φ, λ).",
    matrix: "[[cos(θ/2), -e^(iλ)sin(θ/2)],\n [e^(iφ)sin(θ/2), e^(i(φ+λ))cos(θ/2)]]",
  },
  {
    id: "cz-gate",
    title: "CZ Gate",
    href: "docs/#cz",
    description:
      "A controlled-Z gate, where the phase flip occurs only when the control qubit is in state |1⟩.",
    matrix: "[[1, 0, 0, 0],\n [0, 1, 0, 0],\n [0, 0, 1, 0],\n [0, 0, 0, -1]]",
  },
  {
    id: "phase-gate",
    title: "Phase Gate",
    href: "docs/#phase",
    description:
      "A general phase gate that applies a phase to the qubit, leaving the qubit's amplitude unchanged.",
    matrix: "[[1, 0],\n [0, e^(iθ)]]",
  },
  {
    id: "iswap-gate",
    title: "ISwap Gate",
    href: "docs/#iswap",
    description:
      "A variant of the SWAP gate that introduces a complex phase between the qubits.",
    matrix: "[[1, 0, 0, 0],\n [0, 0, i, 0],\n [0, i, 0, 0],\n [0, 0, 0, 1]]",
  },
  {
    id: "control-s-gate",
    title: "Controlled-S Gate",
    href: "docs/#controlled-s",
    description:
      "A controlled version of the S gate, where the phase shift is applied to the target qubit only if the control qubit is |1⟩.",
    matrix: "[[1, 0, 0, 0],\n [0, 1, 0, 0],\n [0, 0, 1, 0],\n [0, 0, 0, i]]",
  },
  {
    id: "control-t-gate",
    title: "Controlled-T Gate",
    href: "docs/#controlled-t",
    description:
      "A controlled version of the T gate, where the phase shift is applied to the target qubit only if the control qubit is |1⟩.",
    matrix: "[[1, 0, 0, 0],\n [0, 1, 0, 0],\n [0, 0, 1, 0],\n [0, 0, 0, e^(iπ/4)]]",
  },
  {
    id: "toffoli-gate",
    title: "Toffoli Gate",
    href: "docs/#toffoli",
    description:
      "A three-qubit gate that flips the target qubit if both the control qubits are in the |1⟩ state.",
    matrix: "[[1, 0, 0, 0, 0, 0, 0, 0],\n ..., \n [0, 0, 0, 0, 0, 0, 0, 1]]",
  },
  {
    id: "fredkin-gate",
    title: "Fredkin Gate",
    href: "docs/#fredkin",
    description:
      "A reversible three-qubit gate that swaps two target qubits based on the state of the control qubit.",
    matrix: "[[1, 0, ..., 0],\n ..., \n [0, 0, ..., 1]]",
  },

  {
    id: "v-gate",
    title: "V Gate",
    href: "docs/#v",
    description:
      "A single-qubit gate that applies a phase shift of π/4, similar to the T gate but with a different phase shift.",
    matrix: "[[1, -i],\n [i, 1]]",
},
{
    id: "w-gate",
    title: "W Gate",
    href: "docs/#w",
    description:
      "A single-qubit gate that applies a square-root of the Pauli-X operation.",
    matrix: "[[cos(π/4), i*sin(π/4)],\n [i*sin(π/4), cos(π/4)]]",
},
{
    id: "qft",
    title: "QFT Gate",
    href: "docs/#qft",
    description:
      "A series of quantum gates that perform the Quantum Fourier Transform, used in quantum algorithms like Shor's algorithm.",
    matrix: "[[1, 1, 1, ..., 1],\n [1, ω, ω^2, ..., ω^(N-1)],\n ..., \n [1, ω^(N-1), ω^(2*(N-1)), ..., ω^((N-1)*(N-1))]]",
}

];


export function MainNav() {
  const router = useRouter();

  return (
    <NavigationMenu>
      <NavigationMenuList>
      
      <NavigationMenuItem>

          <Link href="/simulator" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Simulator
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.title}
                  onClick={() => router.push(`/docs?gate=${component.id}`)}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
 
    </NavigationMenu>
    
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          ref={ref}
          onClick={onClick}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </button>
      </NavigationMenuLink>
    
    </li>
  );
});
ListItem.displayName = "ListItem";