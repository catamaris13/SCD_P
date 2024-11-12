package packagetracking.server.pkg;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import packagetracking.server.courier.Courier;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="courier_id", nullable = true)
    Courier courier;

    private String deliveryAddress;


    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    private Date createdOn;

    private PackageStatus status;
}
