import org.Mockito.Mock;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.BeforeEach;

import com.auth0.jwt.internal.com.fasterxml.jackson.databind.ObjectMapper;
import com.example.complain.controller.CategoryController;
import com.example.complain.entity.Category;
import com.example.complain.repository.CategoryRepository;
import com.example.complain.service.CategoryService;

import org.Mockito.InjectMocks;

@SpringBootTest
public class CategoryControllerTest {
    private Category category = new Category(1, "title", "title", "multifile");

    private MockMvc mockMvc;

    @InjectMocks
    CategoryController categoryController;

    @Autowired
    ObjecctMapper objectMapper;

    @Mocks
    CategoryRepository categoryRepository;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(this.categoryController);
    }

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

    @Test
    public void fetchCategoryById_should_return_status_200_when_success_fetch_by_id() {

    }

    @Test
    public void saveCategory_should_return_status_201_when_success_saving_requets() {
        when(categoryService.save(null)).thenReturn();
    }

    @Test
    public void saveCategory_should_return_status_500_when_success_saving_requets() {

    }

    @Test
    public void deleteCategory_should_return_status_200_when_success_delete() {

    }

    @Test
    public void deleteCategory_should_return_status_500_when_failing_delete() {

    }
}
