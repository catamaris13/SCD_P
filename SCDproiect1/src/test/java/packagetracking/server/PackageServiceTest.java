package packagetracking.server;

import packagetracking.server.pkg.PackageRepository;
import packagetracking.server.pkg.PackageService;
import packagetracking.server.pkg.Package;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import packagetracking.server.pkg.PackageStatus;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PackageServiceTest {
    @Mock
    private PackageRepository packageRepository;

    @InjectMocks
    private PackageService packageService; // this is the service under test

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAllEmployees(){
        // setup test
        Package p1 = new Package(1, null, "Baritiu 26", new Date(1), PackageStatus.DELIVERED);
        Package p2 = new Package(2, null, "Baritiu 28", new Date(2), PackageStatus.NEW);

        List<Package> packagesMock = List.of(p1, p2);
        when(packageRepository.findAll()).thenReturn(packagesMock);

        // call method under test
        List<Package> packages = packageService.findAllPackages();

        // check what was called by the method and check the result
        verify(packageRepository, times(1)).findAll();
        assertEquals(2, packages.size());
        assertEquals(p1, packages.get(0));
        assertEquals(p2, packages.get(1));
    }
}
