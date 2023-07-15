use std::fs::{self, DirEntry, File};
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};

pub fn read_dir(path: impl AsRef<Path>) -> io::Result<Vec<DirEntry>> {
    let path = path.as_ref();
    let mut entries = vec![];
    for entry in fs::read_dir(path)? {
        entries.push(entry?);
    }
    Ok(entries)
}

pub fn read_file(path: impl AsRef<Path>) -> io::Result<String> {
    let mut file = File::open(path)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    Ok(content)
}

pub fn write_file(path: impl AsRef<Path>, content: impl AsRef<[u8]>) -> io::Result<()> {
    let mut file = File::create(path)?;
    file.write_all(content.as_ref())?;
    Ok(())
}

pub fn rename(old_path: impl AsRef<Path>, new_path: impl AsRef<Path>) -> io::Result<()> {
    fs::rename(old_path, new_path)?;
    Ok(())
}

pub fn unlink_sync(path: impl AsRef<Path>) -> io::Result<()> {
    fs::remove_file(path)?;
    Ok(())
}

pub fn delete_dir(path: impl AsRef<Path>) -> io::Result<()> {
    fs::remove_dir_all(path)?;
    Ok(())
}

pub fn create_dir(path: impl AsRef<Path>) -> io::Result<()> {
    fs::create_dir(path)?;
    Ok(())
}

pub fn create_dir_all(path: impl AsRef<Path>) -> io::Result<()> {
    fs::create_dir_all(path)?;
    Ok(())
}

pub fn exists(path: impl AsRef<Path>) -> bool {
    path.as_ref().exists()
}

pub fn is_file(path: impl AsRef<Path>) -> bool {
    path.as_ref().is_file()
}

pub fn is_dir(path: impl AsRef<Path>) -> bool {
    path.as_ref().is_dir()
}

pub fn metadata(path: impl AsRef<Path>) -> io::Result<fs::Metadata> {
    fs::metadata(path)
}

pub fn copy(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<u64> {
    fs::copy(src, dst)
}

pub fn symlink_file(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    #[cfg(unix)]
    {
        std::os::unix::fs::symlink(src, dst)?;
    }
    #[cfg(windows)]
    {
        std::os::windows::fs::symlink_file(src, dst)?;
    }
    Ok(())
}

pub fn symlink_dir(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    #[cfg(unix)]
    {
        std::os::unix::fs::symlink(src, dst)?;
    }
    #[cfg(windows)]
    {
        std::os::windows::fs::symlink_dir(src, dst)?;
    }
    Ok(())
}

pub fn canonicalize(path: impl AsRef<Path>) -> io::Result<PathBuf> {
    fs::canonicalize(path)
}