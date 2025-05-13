# CONFIGURATION
$pbixPath = "C:\PowerBI\deploy\SupplyChain-BeautyFlow\SupplyChain.pbix"
$workspaceName = "DeploySupplyChain"
$reportName = "SupplyChain"
$pdfPath = "C:\PowerBI\deploy\SupplyChain-BeautyFlow\$reportName.pdf"

# AUTHENTIFICATION
Write-Host "[1/5] Connecting to Power BI..." -ForegroundColor Cyan

# WORKSPACE
Write-Host "[2/5] Searching for workspace '$workspaceName'..." -ForegroundColor Cyan
$workspace = Get-PowerBIWorkspace -Name $workspaceName
if (-not $workspace) {
    Write-Host "❌ Workspace not found." -ForegroundColor Red
    exit 1
}
$workspaceId = $workspace.Id

# DELETE EXISTING REPORT
Write-Host "[3/5] Checking for existing report..." -ForegroundColor Cyan
$existingReport = Get-PowerBIReport -WorkspaceId $workspaceId | Where-Object { $_.Name -eq $reportName }
if ($existingReport) {
    Write-Host "Removing existing report..." -ForegroundColor Yellow
    Remove-PowerBIReport -Id $existingReport.Id -WorkspaceId $workspaceId
    Start-Sleep -Seconds 2
}

# PUBLISH REPORT
Write-Host "[4/5] Publishing report..." -ForegroundColor Cyan
New-PowerBIReport -Path $pbixPath -WorkspaceId $workspaceId -Name $reportName
Start-Sleep -Seconds 5

# EXPORT PDF
Write-Host "[5/5] Exporting report as PDF..." -ForegroundColor Cyan
$report = Get-PowerBIReport -Name $reportName -WorkspaceId $workspaceId
Export-PowerBIReport -ReportId $report.Id -WorkspaceId $workspaceId -OutFile $pdfPath -Format PDF

Write-Host "✅ PDF generated at: $pdfPath" -ForegroundColor Green
