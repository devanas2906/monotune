import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Home } from "./components/home/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ToastContainer
          toastClassName={() =>
            "flex p-4 max-w-xl min-h-12 rounded-xl justify-between cursor-pointer bg-[#121212]/90 border border-white/10 backdrop-blur-md text-zinc-200 text-xs shadow-2xl"
          }
          position="top-center"
        />
      </QueryClientProvider>
    </>
  )
}

export default App;