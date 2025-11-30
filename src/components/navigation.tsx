"use client";
import { Book, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ALLOWED_BOARDS } from "@/lib/constants";
import { Switch } from "./ui/switch";

const filteredBoards = ALLOWED_BOARDS.filter((board) => board.sfw);

export const Navigation = () => {
  const [showNsfw, setShowNsfw] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const boards = showNsfw ? ALLOWED_BOARDS : filteredBoards;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Book className="h-5 w-5" aria-hidden="true" />
            <span className="font-semibold tracking-tight text-lg md:text-xl">
              kuroki.
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-4">
            {boards.map((board) => (
              <Link
                key={board.name}
                href={`/board/${board.name}`}
                className="text-base text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                /{board.name}/
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <span className="text-sm md:text-base tabular-nums text-foreground/60">
            {showNsfw ? "NSFW" : "SFW"}
          </span>
          <Switch
            checked={showNsfw}
            onCheckedChange={setShowNsfw}
            aria-label="Toggle SFW/NSFW boards"
          />
        </div>

        <button
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 hover:bg-foreground/5 md:hidden"
          type="button"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
          <span className="text-sm tabular-nums text-foreground/60">
            {showNsfw ? "NSFW" : "SFW"}
          </span>
          <Switch
            checked={showNsfw}
            onCheckedChange={setShowNsfw}
            aria-label="Toggle SFW/NSFW boards"
          />
        </div>
        <div className="flex flex-col border-t border-border px-2 py-2">
          {boards.map((board) => (
            <Link
              key={board.name}
              href={`/board/${board.name}`}
              className="rounded-md px-2 py-2 text-base text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              /{board.name}/
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
