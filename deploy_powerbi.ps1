# -------------------------------
# CONFIGURATION
# -------------------------------
$pbixPath = "$PSScriptRoot\SupplyChain.pbix"
$workspaceName = "DeploySupplyChain"
$reportName = "SupplyChain"

# -------------------------------
# AUTHENTIFICATION
# -------------------------------
Write-Host "[1/4] Connected to Power BI..." -ForegroundColor Cyan

# -------------------------------
# WORKSPACE CHECK
# -------------------------------
Write-Host "[2/4] Searching for workspace '$workspaceName'..." -ForegroundColor Cyan
$workspace = Get-PowerBIWorkspace -Name $workspaceName

if (-not $workspace) {
    Write-Host "Workspace '$workspaceName' not found." -ForegroundColor Red
    exit 1
}

$workspaceId = $workspace.Id
Write-Host "Workspace found: $workspaceId" -ForegroundColor Green

# -------------------------------
# REMOVE EXISTING REPORT
# -------------------------------
Write-Host "[3/4] Checking if report '$reportName' already exists..." -ForegroundColor Cyan
$existingReport = Get-PowerBIReport -WorkspaceId $workspaceId | Where-Object { $_.Name -eq $reportName }

if ($existingReport) {
    Write-Host "Existing report found. Removing..." -ForegroundColor Yellow
    Remove-PowerBIReport -Id $existingReport.Id -WorkspaceId $workspaceId
    Start-Sleep -Seconds 3
}

# -------------------------------
# PUBLISH REPORT
# -------------------------------
Write-Host "[4/4] Publishing report '$reportName' to '$workspaceName'..." -ForegroundColor Cyan
New-PowerBIReport -Path $pbixPath -WorkspaceId $workspaceId -Name $reportName

Write-Host "Report published successfully!" -ForegroundColor Green
