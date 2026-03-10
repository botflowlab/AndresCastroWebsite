/**
 * Storage cleanup utilities for Supabase
 * Use these functions to investigate and clean up storage usage
 */

import { supabase } from '../supabaseClient';

// Function to list all files in storage bucket
export const listAllStorageFiles = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('project-images')
      .list('', {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    console.log('📁 Storage Files:', data);
    console.log(`📊 Total files: ${data?.length || 0}`);
    
    // Calculate total size
    const totalSize = data?.reduce((sum, file) => sum + (file.metadata?.size || 0), 0) || 0;
    console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    return data;
  } catch (error) {
    console.error('Error listing storage files:', error);
    return [];
  }
};

// Function to find orphaned files (files not referenced in database)
export const findOrphanedFiles = async () => {
  try {
    // Get all files from storage
    const storageFiles = await listAllStorageFiles();
    
    // Get all image URLs from database
    const { data: projects, error } = await supabase
      .from('projects')
      .select('images, blueprints');

    if (error) throw error;

    // Extract all image URLs from projects
    const usedUrls = new Set();
    projects?.forEach(project => {
      project.images?.forEach(url => {
        const fileName = url.split('/').pop();
        usedUrls.add(fileName);
      });
      project.blueprints?.forEach(url => {
        const fileName = url.split('/').pop();
        usedUrls.add(fileName);
      });
    });

    // Find orphaned files
    const orphanedFiles = storageFiles?.filter(file => !usedUrls.has(file.name)) || [];
    
    console.log('🗑️ Orphaned files:', orphanedFiles);
    console.log(`📊 Orphaned files count: ${orphanedFiles.length}`);
    
    const orphanedSize = orphanedFiles.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);
    console.log(`💾 Orphaned files size: ${(orphanedSize / 1024 / 1024).toFixed(2)} MB`);
    
    return orphanedFiles;
  } catch (error) {
    console.error('Error finding orphaned files:', error);
    return [];
  }
};

// Function to delete orphaned files
export const deleteOrphanedFiles = async () => {
  try {
    const orphanedFiles = await findOrphanedFiles();
    
    if (orphanedFiles.length === 0) {
      console.log('✅ No orphaned files found');
      return { success: true, deletedCount: 0 };
    }

    const fileNames = orphanedFiles.map(file => file.name);
    
    console.log(`🗑️ Deleting ${fileNames.length} orphaned files...`);
    
    const { error } = await supabase.storage
      .from('project-images')
      .remove(fileNames);

    if (error) throw error;

    console.log(`✅ Successfully deleted ${fileNames.length} orphaned files`);
    return { success: true, deletedCount: fileNames.length };
  } catch (error) {
    console.error('Error deleting orphaned files:', error);
    return { success: false, error: error.message };
  }
};

// Function to get storage usage summary
export const getStorageUsageSummary = async () => {
  try {
    const files = await listAllStorageFiles();
    const orphaned = await findOrphanedFiles();
    
    const totalSize = files?.reduce((sum, file) => sum + (file.metadata?.size || 0), 0) || 0;
    const orphanedSize = orphaned?.reduce((sum, file) => sum + (file.metadata?.size || 0), 0) || 0;
    const usedSize = totalSize - orphanedSize;

    const summary = {
      totalFiles: files?.length || 0,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      usedFiles: (files?.length || 0) - (orphaned?.length || 0),
      usedSizeMB: (usedSize / 1024 / 1024).toFixed(2),
      orphanedFiles: orphaned?.length || 0,
      orphanedSizeMB: (orphanedSize / 1024 / 1024).toFixed(2),
      canSaveMB: (orphanedSize / 1024 / 1024).toFixed(2)
    };

    console.log('📊 Storage Usage Summary:', summary);
    return summary;
  } catch (error) {
    console.error('Error getting storage summary:', error);
    return null;
  }
};

// Function to clean up duplicate files
export const findDuplicateFiles = async () => {
  try {
    const files = await listAllStorageFiles();
    const duplicates = [];
    const seen = new Map();

    files?.forEach(file => {
      const size = file.metadata?.size || 0;
      const key = `${size}`;
      
      if (seen.has(key)) {
        duplicates.push(file);
      } else {
        seen.set(key, file);
      }
    });

    console.log('🔄 Potential duplicate files:', duplicates);
    return duplicates;
  } catch (error) {
    console.error('Error finding duplicates:', error);
    return [];
  }
};