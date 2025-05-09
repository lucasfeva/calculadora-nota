"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface InfoComponentProps {
  isMobile: boolean;
  children: React.ReactNode;
}

export function InfoComponent({ isMobile, children }: InfoComponentProps) {
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="ghost">
            <Info size={18} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-10 space-y-6">
            <DrawerHeader className="p-0">
              <DrawerTitle>Metodologia de Cálculo</DrawerTitle>
            </DrawerHeader>
            <div className="">{children}</div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Info size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Metodologia de Cálculo</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}
