package packagetracking.server.pkg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    @Transactional
    public Package create(Package myPackage) {
        return packageRepository.save(myPackage);
    }

    public List<Package> findAllPackages(){
        return packageRepository.findAll();
    }
}
