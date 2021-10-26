export function selectArtworks(reduxState) {
  return reduxState.artwork.artworks;
}

export function selectArtworkDetails(reduxState) {
  return reduxState.artwork.artworkDetails;
}
