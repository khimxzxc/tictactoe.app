import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div>
      {/* Navbar */}
      <header style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4caf50', color: 'white' }}>
        <h1 style={{ margin: 0 }}>Tic Tac Toe</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Auth Logic */}
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <SignedIn>
          <h2>Welcome to Tic Tac Toe!</h2>
          <TicTacToe />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </div>
  );
}

export default App;
