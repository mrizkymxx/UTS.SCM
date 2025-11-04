# Initialize Git Repository
Write-Host "🚀 Initializing Git Repository for StokManis..." -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found! Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Initialize git if not already
if (Test-Path .git) {
    Write-Host "ℹ️  Git repository already initialized" -ForegroundColor Yellow
} else {
    Write-Host "Initializing git..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

Write-Host ""

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Cyan
git add .

Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit - StokManis MVP v1.0

Features:
- Dashboard dengan notifikasi stok kritis
- Modul Persediaan (Barang Masuk/Keluar)
- Modul Penjualan (Pesanan & Pengiriman)
- Sistem Notifikasi ROP Otomatis
- Data dummy lengkap
- Responsive design
- Ready untuk deploy ke Vercel"

Write-Host "✅ Initial commit created" -ForegroundColor Green
Write-Host ""

# Instructions
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Create GitHub Repository:" -ForegroundColor Yellow
Write-Host "   - Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Name: stokmanis" -ForegroundColor White
Write-Host "   - Public repository" -ForegroundColor White
Write-Host "   - Do NOT initialize with README" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Connect to GitHub:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/stokmanis.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Deploy to Vercel:" -ForegroundColor Yellow
Write-Host "   - Go to: https://vercel.com/import" -ForegroundColor White
Write-Host "   - Import your GitHub repository" -ForegroundColor White
Write-Host "   - Click Deploy" -ForegroundColor White
Write-Host "   - Done! 🎉" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOY.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Good luck with your deployment! ✨" -ForegroundColor Green
Write-Host ""
