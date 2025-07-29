import React, { useEffect, useState } from 'react';

const URLDebugger: React.FC = () => {
  const [urlInfo, setUrlInfo] = useState({
    fullUrl: '',
    searchParams: '',
    sedesParam: '',
  });

  useEffect(() => {
    const updateUrlInfo = () => {
      const params = new URLSearchParams(window.location.search);
      setUrlInfo({
        fullUrl: window.location.href,
        searchParams: window.location.search,
        sedesParam: params.get('sedes') || 'No encontrado',
      });
    };

    updateUrlInfo();
    
    // Escuchar cambios en la URL
    window.addEventListener('popstate', updateUrlInfo);
    
    return () => {
      window.removeEventListener('popstate', updateUrlInfo);
    };
  }, []);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-yellow-800 mb-2">🔧 URL Debugger</h3>
      <div className="text-sm text-yellow-700 space-y-1">
        <p><strong>URL completa:</strong> {urlInfo.fullUrl}</p>
        <p><strong>Parámetros:</strong> {urlInfo.searchParams || 'Ninguno'}</p>
        <p><strong>Parámetro 'sedes':</strong> {urlInfo.sedesParam}</p>
      </div>
    </div>
  );
};

export default URLDebugger;