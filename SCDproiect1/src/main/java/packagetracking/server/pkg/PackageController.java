package packagetracking.server.pkg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/package")
@CrossOrigin
public class PackageController {

    @Autowired
    private PackageService packageService;

    @PostMapping
    public Package create(@RequestBody Package myPackage)
    {
        return packageService.create(myPackage);
    }

    @GetMapping
    public List<Package> getAllPackages(){
        return packageService.findAllPackages();
    }
}
