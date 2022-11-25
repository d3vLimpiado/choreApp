import ChoreProvider from "./context/ChoreProvider";
import { CInput, CList, Toaster } from "./components";

function App() {
  return (
    <ChoreProvider>
      <Toaster />
      <main>
        <header>
          <h1>CHORES APP</h1>
        </header>
        <section>
          <CInput />
        </section>
        <section>
          <CList />
        </section>
      </main>
    </ChoreProvider>
  );
}

export default App;
