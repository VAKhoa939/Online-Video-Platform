# 1. Requirements
Node version: 22.8.0  
npm version: 10.8.2

# 2. .env file for back-end
    MONGODB_URI=mongodb+srv://video-admin:123@cluster0.dwmre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    PORT=5000

# 3. .env file for front-end
    VITE_API_URL=http://localhost:5000/api  
    VITE_API_PUBLIC_URL=http://localhost:5000/public

# 4. Setup command for back-end
    cd back-end  
    npm ci  
    npm run dev

# 5. Setup command for front-end
    cd front-end  
    npm ci  
    npm run dev
