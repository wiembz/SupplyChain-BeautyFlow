# Connexion au service Power BI
Write-Host "Connexion à Power BI..." -ForegroundColor Cyan
Connect-PowerBIServiceAccount

# Paramètres
$workspaceName = "Nom-de-ton-espace"
$pbixPath = "./mon_fichier.pbix"   # adapte le nom
$datasetName = "Nom-du-dataset"

# Récupérer l'ID de l'espace de travail
$workspace = Get-PowerBIWorkspace -Name $workspaceName
if (-not $workspace) {
    Write-Error "Espace de travail '$workspaceName' introuvable."
    exit 1
}

# Publier le fichier PBIX
Write-Host "Déploiement du fichier PBIX..." -ForegroundColor Green
Import-PowerBIRemoteReport -Path $pbixPath -WorkspaceId $workspace.Id -Name $datasetName -ConflictAction CreateOrOverwrite

Write-Host "✅ Déploiement terminé !" -ForegroundColor Green

