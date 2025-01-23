import SpaceList from "./components/SpaceList";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto p-4 pt-16 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Todo App
        </h1>
        <SpaceList />
      </main>
      <Footer />
    </div>
  );
}
