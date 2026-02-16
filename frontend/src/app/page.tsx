import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
    return (
        <section className="flex h-screen items-center justify-center gap-5">
            <h1 className="text-4xl font-bold">Hello, World!</h1>
            <ModeToggle />
        </section>
    );
}
