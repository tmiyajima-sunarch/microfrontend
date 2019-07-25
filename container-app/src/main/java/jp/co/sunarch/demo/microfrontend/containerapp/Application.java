package jp.co.sunarch.demo.microfrontend.containerapp;

import java.util.Arrays;
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
	public String index(Model model) {
		model.addAttribute("themes", Arrays.asList(
			"default",
			"cerulean",
			"cosmo",
			"cyborg",
			"darkly",
			"flatly",
			"journal",
			"litera",
			"luman",
			"lux",
			"materia",
			"minty",
			"pulse",
			"sandstone",
			"simplex",
			"sketchy",
			"slate",
			"solar",
			"spacelab",
			"superhero",
			"united",
			"yeti"
		));
		model.addAttribute("components", Arrays.asList("a-component", "b-component"));
		return "index";
	}

	@GetMapping("/main")
	public String main(
		Model model,
		@RequestParam(name = "theme", defaultValue = "default") String theme,
		@RequestParam(name = "components", defaultValue = "a-component,b-component") List<String> components) {
		model.addAttribute("theme", theme);
		model.addAttribute("components", components);
		return "main";
	}

}
