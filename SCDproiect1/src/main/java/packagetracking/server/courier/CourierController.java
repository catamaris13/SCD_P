package packagetracking.server.courier;

import packagetracking.server.pkg.Package;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CourierController {

    @GetMapping("/courier/{id}/packages")
    public List<Package> getPackagesForCourier(
            @PathVariable("id") int id
    ){
        return List.of();
    }
}
