# CONFIGURATION
$pbixPath = "C:\PowerBI\deploy\SupplyChain-BeautyFlow\SupplyChain.pbix"
$workspaceName = "DeploySupplyChain"
$reportName = "SupplyChain"

# AUTHENTIFICATION
Write-Host "[1/4] Connected to Power BI..." -ForegroundColor Cyan

# WORKSPACE
Write-Host "[2/4] Searching for workspace '$workspaceName'..." -ForegroundColor Cyan
$workspace = Get-PowerBIWorkspace -Name $workspaceName
if (-not $workspace) {
    Write-Host "❌ Workspace not found." -ForegroundColor Red
    exit 1
}
$workspaceId = $workspace.Id

# CHECK IF REPORT EXISTS
Write-Host "[3/4] Checking if report '$reportName' already exists..." -ForegroundColor Cyan
$existingReport = Get-PowerBIReport -WorkspaceId $workspaceId | Where-Object { $_.Name -eq $reportName }
if ($existingReport) {
    Write-Host "Removing existing report..." -ForegroundColor Yellow
    Remove-PowerBIReport -Id $existingReport.Id -WorkspaceId $workspaceId
    Start-Sleep -Seconds 2
}

# PUBLISH REPORT
Write-Host "[4/4] Publishing report '$reportName'..." -ForegroundColor Cyan
New-PowerBIReport -Path $pbixPath -WorkspaceId $workspaceId -Name $reportName

Write-Host "✅ Published successfully!" -ForegroundColor Green
