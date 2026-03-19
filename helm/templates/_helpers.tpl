{{/*
Full image reference for a given app config.
Usage: include "ferriskey-website.image" (dict "root" $ "app" .appConfig)
*/}}
{{- define "ferriskey-website.image" -}}
{{- printf "%s:%s" .app.image .root.Values.imageTag -}}
{{- end }}

{{/*
Common labels
*/}}
{{- define "ferriskey-website.labels" -}}
helm.sh/chart: {{ .root.Chart.Name }}-{{ .root.Chart.Version }}
app.kubernetes.io/managed-by: {{ .root.Release.Service }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/version: {{ .root.Values.imageTag | quote }}
{{- end }}
