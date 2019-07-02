package jp.co.sunarch.demo.microfrontend.containerapp;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
@Controller
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@GetMapping("/")
	public String get(
		Model model,
		@RequestParam(name = "theme", defaultValue = "default") String theme,
		@RequestParam(name = "components", defaultValue = "a,b") List<String> components) {
		model.addAttribute("theme", theme);
		model.addAttribute("components", components);
		return "index";
	}

}
