import React, { useState, useEffect } from 'react';
import { 
  listAllStorageFiles, 
  findOrphanedFiles, 
  deleteOrphanedFiles, 
  getStorageUsageSummary,
  findDuplicateFiles 
} from '../../../utils/storageCleanup';

export default function StorageManager() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [orphanedFiles, setOrphanedFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);

  useEffect(() => {
    loadStorageSummary();
  }, []);

  const loadStorageSummary = async () => {
    setLoading(true);
    try {
      const summaryData = await getStorageUsageSummary();
      setSummary(summaryData);
      
      const orphaned = await findOrphanedFiles();
      setOrphanedFiles(orphaned);
      
      const duplicates = await findDuplicateFiles();
      setDuplicateFiles(duplicates);
    } catch (error) {
      console.error('Error loading storage summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanupOrphaned = async () => {
    if (!confirm(`Are you sure you want to delete ${orphanedFiles.length} orphaned files? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteOrphanedFiles();
      if (result.success) {
        alert(`Successfully deleted ${result.deletedCount} orphaned files!`);
        await loadStorageSummary(); // Refresh data
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !summary) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading storage analysis...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Storage Management</h2>
        <button
          onClick={loadStorageSummary}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Total Storage</h3>
            <p className="text-2xl font-bold text-blue-600">{summary.totalSizeMB} MB</p>
            <p className="text-sm text-blue-600">{summary.totalFiles} files</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Used Storage</h3>
            <p className="text-2xl font-bold text-green-600">{summary.usedSizeMB} MB</p>
            <p className="text-sm text-green-600">{summary.usedFiles} files</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">Orphaned Files</h3>
            <p className="text-2xl font-bold text-red-600">{summary.orphanedSizeMB} MB</p>
            <p className="text-sm text-red-600">{summary.orphanedFiles} files</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Can Save</h3>
            <p className="text-2xl font-bold text-yellow-600">{summary.canSaveMB} MB</p>
            <p className="text-sm text-yellow-600">by cleanup</p>
          </div>
        </div>
      )}

      {/* Cleanup Actions */}
      <div className="space-y-6">
        {/* Orphaned Files Section */}
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Orphaned Files</h3>
              <p className="text-gray-600">Files in storage not referenced by any project</p>
            </div>
            {orphanedFiles.length > 0 && (
              <button
                onClick={handleCleanupOrphaned}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                Delete {orphanedFiles.length} Files
              </button>
            )}
          </div>
          
          {orphanedFiles.length === 0 ? (
            <p className="text-green-600">✅ No orphaned files found</p>
          ) : (
            <div className="bg-gray-50 p-4 rounded max-h-40 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-2">Files to be deleted:</p>
              <ul className="text-xs space-y-1">
                {orphanedFiles.slice(0, 10).map((file, index) => (
                  <li key={index} className="text-gray-700">
                    {file.name} ({((file.metadata?.size || 0) / 1024).toFixed(1)} KB)
                  </li>
                ))}
                {orphanedFiles.length > 10 && (
                  <li className="text-gray-500">...and {orphanedFiles.length - 10} more</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Duplicate Files Section */}
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Potential Duplicates</h3>
              <p className="text-gray-600">Files with the same size (manual review needed)</p>
            </div>
          </div>
          
          {duplicateFiles.length === 0 ? (
            <p className="text-green-600">✅ No obvious duplicates found</p>
          ) : (
            <div className="bg-gray-50 p-4 rounded max-h-40 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-2">Potential duplicates (review manually):</p>
              <ul className="text-xs space-y-1">
                {duplicateFiles.slice(0, 10).map((file, index) => (
                  <li key={index} className="text-gray-700">
                    {file.name} ({((file.metadata?.size || 0) / 1024).toFixed(1)} KB)
                  </li>
                ))}
                {duplicateFiles.length > 10 && (
                  <li className="text-gray-500">...and {duplicateFiles.length - 10} more</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Storage Optimization Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Orphaned files</strong> are safe to delete - they're not used by any project</li>
            <li>• <strong>Compress images</strong> before uploading (use WebP format when possible)</li>
            <li>• <strong>Limit image size</strong> to 2MB per file for web optimization</li>
            <li>• <strong>Regular cleanup</strong> prevents storage bloat</li>
            <li>• <strong>Check Supabase dashboard</strong> for detailed storage analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}