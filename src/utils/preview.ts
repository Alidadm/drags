export const openPreview = (deviceType: string) => {
  const baseUrl = window.location.origin;
  const currentParams = new URLSearchParams(window.location.search);
  
  // Add device type parameter
  currentParams.set('preview', deviceType);
  
  const previewUrl = `${baseUrl}${window.location.pathname}?${currentParams.toString()}`;
  
  // Open in new tab with device-specific window size
  const windowFeatures = getWindowFeatures(deviceType);
  window.open(previewUrl, `preview-${deviceType}`, windowFeatures);
};

const getWindowFeatures = (deviceType: string): string => {
  switch (deviceType) {
    case 'mobile':
      return 'width=375,height=667,scrollbars=yes,resizable=yes';
    case 'tablet':
      return 'width=768,height=1024,scrollbars=yes,resizable=yes';
    case 'pc':
    default:
      return 'width=1200,height=800,scrollbars=yes,resizable=yes';
  }
};

export const isPreviewMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('preview');
};

export const getPreviewDevice = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('preview');
};