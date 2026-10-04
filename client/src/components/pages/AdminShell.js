import Layout from "../Layout/Layout";
import Adminmenu from "./Adminmenu";
export default function AdminShell({ title, description, children }) {
  return (
    <Layout>
      <section className="min-h-[70vh] bg-slate-50/80 px-5 py-8 sm:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="min-w-0">
            <p className="mb-4 px-3 text-[10px] font-bold tracking-[.2em] text-slate-400">
              CODEBRICKET STUDIO
            </p>
            <Adminmenu />
          </aside>
          <div className="min-w-0">
            <header className="mb-7">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </header>
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
}
