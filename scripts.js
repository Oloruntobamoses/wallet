// Mock user data
let currentUser = null;
const users = [
  { email: "user1@example.com", password: "password1", name: "User 1", walletAddress: "0x1234567890", balance: 100 },
  { email: "user2@example.com", password: "password2", name: "User 2", walletAddress: "0x0987654321", balance: 50 }
];

// Function to handle login
const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    document.getElementById("username").textContent = currentUser.name;
    document.getElementById("wallet-address").textContent = currentUser.walletAddress;
    document.getElementById("balance").textContent = currentUser.balance + " USDC";
    document.getElementById("login-register").style.display = "none";
    document.getElementById("wallet").style.display = "block";
  } else {
    alert("Invalid email or password");
  }
};

// Function to handle registration
const register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }
  if (users.some(user => user.email === email)) {
    alert("User already exists. Please login.");
    return;
  }
  const newUser = {
    email: email,
    password: password,
    name: email.split('@')[0], // Simple username from email
    walletAddress: generateWalletAddress(),
    balance: 0
  };
  users.push(newUser);
  currentUser = newUser;
  document.getElementById("username").textContent = currentUser.name;
  document.getElementById("wallet-address").textContent = currentUser.walletAddress;
  document.getElementById("balance").textContent = currentUser.balance + " USDC";
  document.getElementById("login-register").style.display = "none";
  document.getElementById("wallet").style.display = "block";
};

// Function to handle password reset
const resetPassword = () => {
  const newPassword = prompt("Enter your new password:");
  const confirmPassword = prompt("Confirm your new password:");

  if (!newPassword || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  currentUser.password = newPassword;
  alert("Password reset successfully.");
};

// Function to handle logout
const logout = () => {
  currentUser = null;
  document.getElementById("login-register").style.display = "block";
  document.getElementById("wallet").style.display = "none";
};

// Function to send USDC
const sendUSDC = () => {
  const recipientAddress = document.getElementById("recipient-address").value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (!recipientAddress || isNaN(amount) || amount <= 0) {
    alert("Invalid recipient address or amount.");
    return;
  }
  const recipient = users.find(u => u.walletAddress === recipientAddress);
  if (!recipient) {
    alert("Recipient wallet address not found.");
    return;
  }
  if (currentUser.balance < amount) {
    alert("Insufficient balance.");
    return;
  }
  currentUser.balance -= amount;
  recipient.balance += amount;
  document.getElementById("balance").textContent = currentUser.balance + " USDC";
  alert(`Successfully sent ${amount} USDC to ${recipientAddress}.`);
};

// Function to generate a random wallet address
const generateWalletAddress = () => {
  return "0x" + Math.random().toString(16).substr(2, 10);
};

// Function to handle token swap
const tokenSwap = () => {
  alert("Token swap feature is not implemented yet");
};

// Event listeners
document.getElementById("login").addEventListener("click", login);
document.getElementById("register").addEventListener("click", register);
document.getElementById("reset-password").addEventListener("click", resetPassword);
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("send").addEventListener("click", sendUSDC);
document.getElementById("swap").addEventListener("click", tokenSwap);
