export const REFRESH_PARAM = 'refresh'

export function getRefreshUrl(baseUrl: string | URL): URL {
	const url = new URL(baseUrl)
	url.searchParams.set(REFRESH_PARAM, Date.now().toString())
	return url
}
