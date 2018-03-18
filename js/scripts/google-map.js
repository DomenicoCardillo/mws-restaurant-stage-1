const loadGoogleMaps = () => {
  const googleMapScript = document.createElement('script');
  
  googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJxh3F1ux9cd7ewAaVK_wwJTGc2O2iVc8&libraries=places&callback=initMap';
  googleMapScript.async = '';
  googleMapScript.defer = '';
  googleMapScript.type = 'text/javascript';
  
  document.body.appendChild(googleMapScript);
};

export default loadGoogleMaps;