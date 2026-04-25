import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth")?.value;

    if (auth !== process.env.ADMIN_PASSWORD) {
        redirect("/admin-login");
    }

    return (
        <div className="min-h-screen bg-base">
            {/* Admin top bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-nav border-b border-ink bg-base
                      flex items-center justify-between px-6 md:px-8">
                <div className="flex items-center gap-4">
                    <span className="font-display font-black text-xl uppercase tracking-[-0.04em]">
                        GRAINLINE
                    </span>
                    <span className="font-mono text-data-sm uppercase tracking-widest text-ink-muted">
                        / ADMIN
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="font-mono text-data-sm uppercase tracking-widest text-ink-muted
                       hover:text-ink transition-colors duration-0"
                    >
                        ← VIEW SITE
                    </Link>
                    <Link
                        href="/api/admin/logout"
                        className="font-mono text-data-sm uppercase tracking-widest
                       bg-ink text-base px-4 py-2
                       hover:bg-ochre hover:text-ink
                       transition-colors duration-0"
                    >
                        LOGOUT
                    </Link>
                </div>
            </div>

            <div className="pt-nav">{children}</div>
        </div>
    );
}