"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface RepositoryModalProps {
  isAvailable?: boolean;
  children: React.ReactNode;
}

export function RepositoryModal({ isAvailable = true, children }: RepositoryModalProps) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 bg-black/80 z-50 pointer-events-none">
          <div className="fixed inset-0 overflow-y-auto h-[100dvh] z-50 w-full">
            <div className="flex relative items-start py-6 justify-center text-center">
              <Dialog.Content className="relative md:py-6 text-left align-middle md:rounded-xl w-full md:max-w-[1050px] bg-white">
                <Dialog.Title />
                {children}
              </Dialog.Content>
            </div>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
