// Create a dummy auth object to simulate login state locally since Firebase failed to provision
const mockUser = null; // Set to a string ID if you want to be logged in by default

export const auth = {
  currentUser: mockUser,
  onAuthStateChanged: (cb: any) => {
    // Automatically mock login session
    const user = { uid: '123', email: 'admin@auction.com', displayName: 'Mock Admin' };
    cb(user);
    return () => {};
  },
  signOut: async () => {},
  signInWithPopup: async () => {},
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {}
} as any;

export const db = {} as any;

