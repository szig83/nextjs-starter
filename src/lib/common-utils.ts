/**
 * @packageDocumentation
 * Szerver és kliens oldalon is használható segéd függvények
 */

/**
 * A bemeneti string első karakterét nagybetűsre alakítja.
 * @param input Átalakítandó string
 * @returns Átalakított string
 */
export function capitalizeFirstLetter(input: string): string {
	if (input.length === 0) return input
	return input.charAt(0).toUpperCase() + input.slice(1)
}
