param(
    [int]$Port = 8000
)

Write-Host "Starting simple PowerShell static server on port $Port..."

$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Error "Failed to start HttpListener. Try running PowerShell as Administrator or choose a different port. $_"
    exit 1
}

Write-Host "Serving files from: $(Get-Location)"
Write-Host "Open http://localhost:$Port in your browser"

function Get-ContentType($path) {
    switch -Regex ([System.IO.Path]::GetExtension($path).ToLower()) {
        ".html" { return "text/html" }
        ".htm"  { return "text/html" }
        ".js"   { return "application/javascript" }
        ".css"  { return "text/css" }
        ".json" { return "application/json" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".gif"  { return "image/gif" }
        ".svg"  { return "image/svg+xml" }
        ".ico"  { return "image/x-icon" }
        default { return "application/octet-stream" }
    }
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response

    $relPath = $req.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($relPath)) { $relPath = 'index.html' }

    # Prevent path traversal
    $safePath = Join-Path (Get-Location) ($relPath -replace '\.\.', '')

    if (Test-Path $safePath -PathType Leaf) {
        try {
            $bytes = [System.IO.File]::ReadAllBytes($safePath)
            $res.ContentType = Get-ContentType $safePath
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $res.StatusCode = 500
            $msg = [Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
            $res.OutputStream.Write($msg,0,$msg.Length)
        }
    } else {
        $res.StatusCode = 404
        $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $res.OutputStream.Write($msg,0,$msg.Length)
    }

    $res.Close()
}

$listener.Stop()
