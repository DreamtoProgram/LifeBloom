Add-Type -AssemblyName System.Drawing
$rawPath = "C:\Users\offic\.gemini\antigravity\brain\f61851f4-9b82-4eea-82c6-cfa9f10881f0\.user_uploaded\media_1795627942483_6d3df0cd.jpg"
$raw = [System.Drawing.Image]::FromFile($rawPath)

# Dr. Priyanka Chhibber portrait crop
# Hair top is around Y=330, head room starts at Y=260
# Arms and sleeve buttons are around Y=860-890
$cropY = 260
$cropHeight = 630
$cropWidth = $raw.Width # 466

$bmp = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$srcRect = [System.Drawing.Rectangle]::new(0, $cropY, $cropWidth, $cropHeight)
$destRect = [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight)
$g.DrawImage($raw, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$targetPath = "public\priyanka-chhibber.jpg"
if (Test-Path $targetPath) {
    Remove-Item $targetPath -Force
}

# Save with 95% JPEG quality
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]95)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$bmp.Save($targetPath, $jpegCodec, $encoderParams)

$g.Dispose()
$bmp.Dispose()
$raw.Dispose()
Write-Host "Successfully generated portrait: $targetPath ($cropWidth x $cropHeight)"
