import org.Mockito.Mock;
import org.junit.jupiter.api.Test;
import com.example.complain.repository.CategoryRepository;
import org.Mockito.InjectMocks;

@SpringBootTest
public class CategoryControllerTest {
    @InjectMocks
    CategoryService categoryService;

    @Mocks
    CategoryRepository categoryRepository;

    @Test
    public void fetchAllCategory_should_return_status_200_when_success_find_all() {

    }

    @Test
    public void fetchAllCategory_should_return_status_500_when_failed_to_find_all() {

    }

    @Test
    public void fetchAllCategoryWithoutPagination_should_return_status_200_when_failed_to_find_all_without_pagination() {

    }

    @Test
    public void fetchAllCategoryWithoutPagination_should_return_status_500_when_failed_to_find_all_without_pagination() {

    }
}
